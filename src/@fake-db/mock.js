import MockAdapter from 'axios-mock-adapter';
import { baseAxios } from 'services';

const mock = new MockAdapter(baseAxios);

export default mock;
