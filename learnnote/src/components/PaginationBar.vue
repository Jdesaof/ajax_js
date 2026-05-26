<script setup>
import { computed } from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    totalPages: {
        type: Number,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['page-change']);

const paginationItems = computed(() => {
    const total = props.totalPages;
    const current = props.currentPage;

    if (total <= 7) {
        return Array.from({ length: total }, (_, index) => index + 1);
    }

    if (current <= 4) {
        return [1, 2, 3, 4, 5, 'right-ellipsis', total];
    }

    if (current >= total - 3) {
        return [1, 'left-ellipsis', total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, 'left-ellipsis', current - 1, current, current + 1, 'right-ellipsis', total];
});

function changePage(page) {
    if (
        typeof page !== 'number' ||
        page === props.currentPage ||
        page < 1 ||
        page > props.totalPages
    ) {
        return;
    }

    emit('page-change', page);
}
</script>

<template>
    <nav v-if="totalPages > 1" class="pagination is-centered my-5" role="navigation" aria-label="pagination">
        <button class="pagination-previous" :disabled="disabled || currentPage === 1"
            @click="changePage(currentPage - 1)">
            Previous
        </button>

        <button class="pagination-next" :disabled="disabled || currentPage === totalPages"
            @click="changePage(currentPage + 1)">
            Next
        </button>

        <ul class="pagination-list">
            <li v-for="item in paginationItems" :key="item">
                <span v-if="typeof item === 'string'" class="pagination-ellipsis">
                    &hellip;
                </span>

                <button v-else class="pagination-link" :class="{ 'is-current': item === currentPage }"
                    :disabled="disabled" @click="changePage(item)">
                    {{ item }}
                </button>
            </li>
        </ul>
    </nav>
</template>