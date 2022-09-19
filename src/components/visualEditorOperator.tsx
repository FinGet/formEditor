import { defineComponent, PropType, reactive, ref, watch } from 'vue';
import { VisualEditorBlockData, VisualEditorConfig, VisualEditorModelValue } from './visualEditor.utils';
import { ElColorPicker, ElForm, ElFormItem, ElInput, ElInputNumber, ElOption, ElSelect, ElButton, ElRadioGroup, ElRadioButton } from 'element-plus';
import { VisualEditorProps, VisualEditorPropsType } from './visualEditor.props';
import deepcopy from 'deepcopy';
import { TablePropEditor } from './modules/tablePropEditor/tablePropEditor';
export const VisualEditorOperator = defineComponent({
  props: {
    block: { type: Object as PropType<VisualEditorBlockData> },
    config: { type: Object as PropType<VisualEditorConfig>, required: true },
    dataModel: { type: Object as PropType<{ value: VisualEditorModelValue }>, required: true },
    updateBlock: {
      type: Function as PropType<((newBlock: VisualEditorBlockData, oldBlock: VisualEditorBlockData) => void)>,
      required: true
    },
    updateModelValue: {
      type: Function as PropType<((val: VisualEditorModelValue) => void)>,
      required: true,
    }
  },

  setup(props) {
    const state = reactive({
      editData: {} as any,
    });
    // const platform = ref('h5');
    const methods = {
      apply: () => {
        if (!props.block) {
          /*当前编辑容器属性*/
          // console.log(props.dataModel.value, state.editData)
          props.updateModelValue({
            ...props.dataModel.value,
            container: state.editData,
          });
        } else {
          /*当前编辑block数据的属性*/
          const newBlock = state.editData;
          // console.log(state.editData)
          props.updateBlock(newBlock, props.block);
        }
      },
      reset: () => {
        if (!props.block) {
          state.editData = deepcopy(props.dataModel.value.container);
        } else {
          state.editData = deepcopy(props.block);
        }
      },
    };
    watch(() => props.block, (val) => {
      methods.reset();
    }, { immediate: true });
    /**
     * 这里不像是block，这里设定了几种类型，input color select table
     * 通过组件设置的可配置属性来显示
     * @param propName 
     * @param propConfig 
     * @returns 
     */
    const renderEditor = (propName: string, propConfig: VisualEditorProps) => {
      return {
        [VisualEditorPropsType.input]: () => (<ElInput v-model={state.editData.props[propName]} />),
        [VisualEditorPropsType.color]: () => (<ElColorPicker v-model={state.editData.props[propName]} />),
        [VisualEditorPropsType.select]: () => (<ElSelect v-model={state.editData.props[propName]}>
          {(() => {
            return propConfig.options!.map(opt => (
              <ElOption label={opt.label} value={opt.val} />
            ));
          })()}
        </ElSelect>),
        [VisualEditorPropsType.table]: () => <TablePropEditor v-model={state.editData[propName]} propConfig={propConfig}></TablePropEditor>
      }[propConfig.type]();
    };
    const bgImgs = [
      'https://tva1.sinaimg.cn/large/e6c9d24ely1h68iiaw7xmj20u01o0jyh.jpg',
      'https://tva1.sinaimg.cn/large/e6c9d24ely1h68jwrsei1j20sg1pkwev.jpg'
    ];
    const handleChangeBg = (img:string) => {
      props.updateModelValue({
        ...props.dataModel.value,
        container: {
          ...state.editData,
          background: img
        },
      });
    };
    return () => {
      let content: JSX.Element[] = [];
      if (!props.block) {
        content.push(<>
          <div>选择背景：</div>
          <div style="display:flex">
            {bgImgs.map(img => (
              <div style="margin-right: 10px; cursor:pointer;" onClick={() => handleChangeBg(img)}>
                <img style="width:100px" src={img} alt="" />
              </div>
            ))}
          </div> 
        </>);
      } else {
        const { componentKey } = props.block;
        const component = props.config.componentMap[componentKey];
        // 通过组件标识 可以实现组件自定义渲染 也就是插槽的name
        content.push(<ElFormItem label="组件标识">
          <ElInput v-model={state.editData.slotName}/>
        </ElFormItem>);
        if (!!component) {
          if (!!component.props) {
            content.push(<>
              {Object.entries(component.props || {}).map(([propName, propConfig]) => (
                <ElFormItem label={propConfig.label} key={propName}>
                  {renderEditor(propName, propConfig)}
                </ElFormItem>
              ))}
            </>);
          }
          if (!!component.model) {
            content.push(<>
              {Object.entries(component.model).map(([moduleName, label]) => (
                <ElFormItem label={label}>
                  <ElInput v-model={state.editData.model[moduleName]} />
                </ElFormItem>
              ))}
            </>);
          }

        }

      }
      return (
        <div class="visual-editor-operator">
          <ElForm labelPosition="top">
            {content}
            <ElFormItem>
              <ElButton type="primary" {...{ onClick: methods.apply } as any}>应用</ElButton>
              <ElButton {...{ onClick: methods.reset } as any}>重置</ElButton>
            </ElFormItem>
          </ElForm>
        </div>
      );
    };
  }
});