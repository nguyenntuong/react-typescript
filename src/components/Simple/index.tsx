import { composeInferTypeMemo } from 'utils/composeInferType';

export interface ISimpleProps {}
function Simple({}: ISimpleProps): React.FunctionComponentElement<ISimpleProps> {
    return <div>Simple</div>;
}
export default composeInferTypeMemo(Simple)();
