import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Graph from '../src/components/Graph.vue'
import ButtonItem from '../src/components/ButtonItem.vue'
import SelectItem from '../src/components/SelectItem.vue'
import LoaderItem from '../src/components/LoaderItem.vue'

vi.mock('../api/index', () => ({
  processDataArray: vi.fn().mockResolvedValue({}),
}));

const HighchartsStub = {
  name: 'highcharts',
  props: ['options'],
  template: `<div class="highcharts"></div>`,
};

describe('Graph Component', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(async () => {
    wrapper = mount(Graph, {
      global: {
        components: { ButtonItem, SelectItem, LoaderItem },
        stubs: { highcharts: HighchartsStub },
      },
    });
    await flushPromises();
  });

  it('displays 2 selects by default', () => {
    const yearSelect = wrapper.find('#select-id'); 
    expect(yearSelect.exists()).toBe(true);

    const regionSelects = wrapper.findAll('[data-test="select-item"]');
    expect(regionSelects).toHaveLength(2);
  });

  it('adds one select when clicking the add button', async () => {
    const addButton = wrapper.find('[data-test="add-item"]');
    expect(addButton.exists()).toBe(true);

    await addButton.trigger('click');
    await nextTick();

    const regionSelects = wrapper.findAll('[data-test="select-item"]');
    expect(regionSelects).toHaveLength(3);
  });

  it('removes one select when clicking the delete button after adding one', async () => {
    const deleteButton = wrapper.find('[data-test="remove-item"]');
    expect(deleteButton.exists()).toBe(true);
    await deleteButton.trigger('click');
    await nextTick();

    const regionSelects = wrapper.findAll('[data-test="select-item"]');
    expect(regionSelects).toHaveLength(2);
  });
});
