import { defer } from '@/components/utils/defer';
import { VisualEditorProps } from '@/components/visualEditor.props';
import deepcopy from 'deepcopy';
import { ElButton, ElDialog, ElTable, ElTableColumn,ElInput } from 'element-plus';
import { defineComponent, getCurrentInstance, onMounted, PropType, reactive, ref,createApp } from 'vue';

export interface TablePropEditorServiceOption {
  data: any[],
  config: VisualEditorProps,
  onConfirm: (val: any[]) => void
}

const ServiceComponent = defineComponent({
  props: {
    option: {type: Object as PropType<TablePropEditorServiceOption>, required: true}
  },
  setup(props) {
    const ctx = getCurrentInstance();
    const el = ref({} as HTMLDivElement);
    const state = reactive({
      option: props.option,
      showFlag: false,
      mounted: (() => {
        const dfd = defer();
        onMounted(() => setTimeout(()=>dfd.resolve(), 0));
        return dfd.promise;
      })(),
      editData: [] as any[]
    });


    const methods = {
      service: (option: TablePropEditorServiceOption) => {
        state.option = option;
        state.editData = deepcopy(option.data || []);
        methods.show();
      },
      show: async () => {
        await state.mounted;
        state.showFlag = true;
      },
      hide: () => {
        state.showFlag = false;
      },
      add: () => {
        state.editData.push({});
      },
      reset: () => {
        state.editData = deepcopy(state.option.data);
      },
    };
    const handler = {
      onConfirm: () => {
        state.option.onConfirm(state.editData);
        methods.hide();
      },
      onCancel: () => {
        methods.hide();
      },
      onDelete: (index: number) => {
        state.editData.splice(index, 1);
      },
    };
    Object.assign(ctx?.proxy, methods);
    // @ts-ignore
    return () => <ElDialog v-model={state.showFlag}>
      {
        {
          default: () => (
            <div>
              <div>
              <ElButton size="small" type="primary" {...{onClick: methods.add} as any}>??????</ElButton>
              <ElButton size="small" type="warning" {...{onClick: methods.reset} as any}>??????</ElButton>
            </div>
            <ElTable data={state.editData}>
              <ElTableColumn {...{type: 'index'} as any}/>
              {state.option.config.table!.options.map((item,index) => (
                <ElTableColumn {...{label: item.label} as any}>
                  {{
                    default: ({row}:{row:any}) => <ElInput v-model={row[item.field]}/>
                  }}
                </ElTableColumn>
              ))}
              <ElTableColumn {...{label: '?????????'} as any}>
                {{
                  default: ({$index}: { $index: number }) => <ElButton
                      type="danger" size="mini" {...{onClick: () => handler.onDelete($index)} as any}>
                      ??????
                  </ElButton>
                }}
              </ElTableColumn>
            </ElTable>
            </div>
          ),
          footer: () => <>
            <ElButton {...{onClick: handler.onCancel} as any}>??????</ElButton>
            <ElButton type="primary" {...{onClick: handler.onConfirm} as any}>??????</ElButton>
          </>
        }
      }
    </ElDialog>;
  }
});

export const $$tablePropEditor = (() => {
  let ins: any;
  return (option: Omit<TablePropEditorServiceOption, 'onConfirm'>) => {
    if (!ins) {
      const el = document.createElement('div');
      document.body.appendChild(el);
      ins = createApp(ServiceComponent, {option}).mount(el);
    }
    const dfd = defer<any[]>();
    ins.service({
      ...option,
      onConfirm: dfd.resolve
    });
    return dfd.promise;
  };
})();