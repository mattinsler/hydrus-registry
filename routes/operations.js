import { view } from '@mattinsler/garnish';

const { mongodb } = APP;
const Operation = mongodb.createModel('operations');

class OperationsRoute {
  @view({ id: '!_id' })
  list() {
    return Operation.array();
  }

  @view({ id: '!_id' })
  get({ params: { name } }) {
    return Operation.where({ _id: name }).first();
  }

  @view({ id: '!_id' })
  listForService({ params: { name } }) {
    return Operation.where({ service: name }).array();
  }
}

export default OperationsRoute;
