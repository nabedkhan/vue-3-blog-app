<template>
  <Loading v-if="isPostEmpty" />

  <div v-else-if="state.notFound" class="mx-auto max-w-7xl">
    <div class="border rounded-lg shadow-sm border-slate-300">
      <h2 class="py-10 text-2xl text-center">Post Not Available</h2>
    </div>
  </div>

  <div v-else class="mx-auto max-w-7xl">
    <div class="px-5 py-4 border border-gray-200">
      <h3 class="text-2xl font-medium tracking-wider uppercase text-slate-900">
        {{ state.post.title }}
      </h3>

      <p class="mt-2 text-justify text-slate-600">
        {{ state.post.body }}
      </p>

      <p class="mt-5 text-justify text-slate-600">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, eius
        molestias porro reprehenderit a earum officiis optio! Aliquid illo
        mollitia, excepturi tempora eaque totam voluptas accusamus iste delectus
        sed voluptatum labore quidem. Aperiam excepturi nisi eius cumque
        recusandae illum cum qui esse inventore expedita assumenda iste
        exercitationem, suscipit natus, perspiciatis quibusdam. Animi tenetur
        temporibus, mollitia unde harum ipsum repellat impedit maiores, voluptas
        laborum velit recusandae soluta quos nesciunt doloremque itaque
        reiciendis, ducimus nobis molestiae necessitatibus veritatis sed
        incidunt nostrum. Perferendis inventore nemo tempore est cumque velit,
        hic earum quod et incidunt reiciendis id error, labore nulla. At labore
        ea, explicabo ex tenetur, enim excepturi laudantium dicta autem unde
        magnam iure consequuntur officiis illum inventore non voluptates.
        Libero, similique deserunt veritatis sequi explicabo neque iste, hic quo
        quas quidem temporibus et excepturi soluta praesentium illum voluptate
        eos distinctio provident voluptatibus odio minima laborum qui. Ullam
        officia distinctio ut delectus optio minus consectetur excepturi?
        Delectus, voluptas. At voluptas dignissimos animi itaque aspernatur est
        sequi neque nihil, ad accusamus, illo facilis voluptatibus? Neque
        voluptate rem eius sed, ut dignissimos facilis iste culpa deleniti a
        quaerat tenetur sint reiciendis nam, asperiores voluptas. Rem excepturi
        tempore nam repellat eius recusandae, accusamus id non voluptatem fugit
        quia enim laboriosam libero exercitationem necessitatibus aspernatur
        perferendis? Soluta repellat blanditiis dolor ut, consequuntur ducimus
        perferendis animi, sed nemo sint ipsam, nostrum odio porro. Labore
        deserunt quibusdam natus deleniti architecto incidunt eius, doloremque
        voluptatum blanditiis fugiat impedit dicta dolores aut odit placeat
        inventore numquam id accusantium nam enim animi vel quia facere? Vel
        nostrum sequi dicta, iure totam unde. Dignissimos, facilis? Accusamus
        obcaecati, unde mollitia architecto eveniet aut incidunt nemo
        consequatur excepturi nihil officia accusantium perspiciatis quae
        explicabo, facere iure itaque tempora facilis tenetur, aperiam dolore
        iste sunt repellendus? Debitis impedit blanditiis ducimus explicabo
        consectetur labore, cum ex veniam velit.
      </p>

      <div class="flex items-center justify-between mt-10">
        <button
          @click="handlePrev()"
          class="px-4 py-2 transition-all rounded-md text-slate-100 bg-slate-900 hover:bg-stone-800"
        >
          Prev
        </button>

        <button
          @click="handleNext()"
          class="px-4 py-2 transition-all rounded-md text-slate-100 bg-slate-900 hover:bg-stone-800"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

import { usePostsStore } from "../store/posts";
import Loading from "../components/Loading.vue";

const state = reactive({
  post: null,
  isEmpty: true,
  notFound: false,
});

const route = useRoute();
const router = useRouter();
const store = usePostsStore();

const isPostEmpty = computed(() => state.isEmpty);

const handlePrev = () => {
  const id = Number(route.params.id);
  if (id > 1) {
    router.push(`/posts/${id - 1}`);
  }
};
const handleNext = () => {
  const id = Number(route.params.id);
  if (id < store.posts.length) {
    router.push(`/posts/${id + 1}`);
  }
};

const fetchPost = async (id) => {
  try {
    const data = await store.getPost(id);
    state.post = data;
    state.isEmpty = false;
  } catch (error) {
    state.isEmpty = false;
    state.notFound = true;
  }
};

onMounted(() => {
  fetchPost(route.params.id);
});

onBeforeRouteUpdate((to) => {
  fetchPost(to.params.id);
});
</script>
