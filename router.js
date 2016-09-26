import { classApiResolver } from 'routers';

export default function(app) {
  const resolve = classApiResolver('routes');

  app.post('/services', resolve('services#create'));

  app.get('/services', resolve('services#list'));
  app.get('/services/:name', resolve('services#get'));

  app.get('/services/:name/operations', resolve('operations#listForService'));

  app.get('/operations', resolve('operations#list'));
  app.get('/operations/:name', resolve('operations#get'));

  app.use(resolve.errorHandler);
}
