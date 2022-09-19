export enum VisualEditorPropsType {
  input='input',
  color='color',
  select='select',
  table = 'table'
}
export interface VisualEditorProps {
  type: VisualEditorPropsType,
  label: string,
  options?: VisualEditorSelectOptions,
  table?: VisualEditorTableOption,
}

export function createEditorInputProp(label:string):VisualEditorProps {
  return {
    type: VisualEditorPropsType.input,
    label
  };
}

export function createEditorColorProp(label:string):VisualEditorProps {
  return {
    type: VisualEditorPropsType.color,
    label
  };
}

export type VisualEditorSelectOptions = {
  label: string,
  val: string
}[]

export function createEditorSelectProp(label:string, options:VisualEditorSelectOptions):VisualEditorProps {
  return {
    type: VisualEditorPropsType.select,
    label,
    options
  };
}


export type VisualEditorTableOption = {
  options: {
    label: string,  // 列显示文本
    field: string,  // 列绑定的字段
  }[],
  showKey: string
}

export function createEditorTableProp(label: string, option: VisualEditorTableOption): VisualEditorProps {
  return {
    type: VisualEditorPropsType.table,
    label,
    table: option,
  };
}