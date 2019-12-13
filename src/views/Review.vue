<template>
  <div>
    <div class="bg-gray-light border-bottom">
      <div class="container-lg p-responsive text-center py-6">
        <h1 class="h0-mktg">Review</h1>
      </div>
    </div>
    <div class="explore-pjax-container container-lg p-responsive pt-6">
      <div class="Box">
        <div class="Box-header">
          <div class="d-flex flex-items-center">
            <h4 class="flex-auto text-normal text-gray-light">
              Review ({{ items.length }})
            </h4>
            <button
              class="btn btn-outline js-refresh-featured-accounts"
              type="button"
              @click="loadData"
            >
              <svg
                class="octicon octicon-sync"
                viewBox="0 0 12 16"
                version="1.1"
                width="12"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.24 7.4a4.15 4.15 0 01-1.2 3.6 4.346 4.346 0 01-5.41.54L4.8 10.4.5 9.8l.6 4.2 1.31-1.26c2.36 1.74 5.7 1.57 7.84-.54a5.876 5.876 0 001.74-4.46l-1.75-.34zM2.96 5a4.346 4.346 0 015.41-.54L7.2 5.6l4.3.6-.6-4.2-1.31 1.26c-2.36-1.74-5.7-1.57-7.85.54C.5 5.03-.06 6.65.01 8.26l1.75.35A4.17 4.17 0 012.96 5z"
                ></path>
              </svg>
              &nbsp;Refresh
            </button>
          </div>
        </div>
        <div>
          <template v-if="!isLoading">
            <review-item
              v-for="(item, idx) in items"
              :index="idx"
              :key="item.key"
              :item="item"
              @remove="onRemove"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewItem from "@/components/ReviewItem.vue";
import { loadItemToReview } from "@/firebase";

export default {
  components: {
    ReviewItem
  },
  data() {
    return {
      items: [],
      isLoading: false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      const data = await loadItemToReview();
      this.items = Object.keys(data || {}).map(key => {
        return {
          key,
          ...data[key]
        };
      });
      this.isLoading = false;
    },
    onRemove(item) {
      this.items = this.items.filter(i => i.key !== item.key);
    }
  }
};
</script>
