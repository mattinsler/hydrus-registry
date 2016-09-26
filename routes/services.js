import { createHash } from 'crypto';
import { view } from '@mattinsler/garnish';

const { mongodb } = APP;
const Service = mongodb.createModel('services');
const Operation = mongodb.createModel('operations');
const { Timestamp } = Service;

function hash(v) {
  return createHash('sha256').update(JSON.stringify(v)).digest('hex');
}

class ServicesRoute {
  async create({ body: service }) {
    const now = new Date();
    const sha = hash(service);

    const [numUpdated] = await Service.where({
      _id: service.name, updatedAt: { $lt: now }
    }).update({
      $set: {
        sha,
        updatedAt: now
      }
    });

    if (numUpdated === 0) {
      await Service.save({
        _id: service.name,
        sha,
        createdAt: now,
        updatedAt: now
      });
    }

    await Operation.where({ service: service.name }).remove();

    for (let operation of service.operations) {
      await Operation.save({
        _id: `${service.name}.${operation.name}`,
        name: operation.name,
        service: service.name,
        fields: operation.fields
      });
    }

    return this.get({ params: { name: service.name } });
  }

  @view({ id: '!_id' })
  list() {
    return Service.array();
  }

  @view({ id: '!_id' })
  get({ params: { name } }) {
    return Service.where({ _id: name }).first();
  }
}

export default ServicesRoute;
