// outsource dependencies
import _ from 'lodash';
import { faker } from '@faker-js/faker';
import { createServer, Model, Factory, Response } from 'miragejs';


// local dependencies
import { UserModel, UserModelResponse } from '@/types/models/user.ts';


export const fetchUsers = (url: string) =>
  fetch(url).then<UserModelResponse>((r) => r.json());

export function makeServer ({ environment = 'test' }) {
  return createServer({
    environment,

    trackRequests: true,

    models: {
      user: Model.extend<Partial<UserModel>>({}),
    },

    factories: {
      user: Factory.extend<Partial<UserModel>>({
        get firstName () {
          return faker.person.firstName();
        },
        get lastName () {
          return faker.person.lastName();
        },
        get name () {
          return faker.person.fullName({ firstName: this.firstName, lastName: this.lastName });
        },
        get streetAddress () {
          return faker.address.streetAddress();
        },
        get cityStateZip () {
          return faker.helpers.fake(
            '{{address.city}}, {{address.stateAbbr}} {{address.zipCode}}'
          );
        },
        get phone () {
          return faker.phone.number();
        },
        get username () {
          return faker.internet.userName({ firstName: this.firstName, lastName: this.lastName });
        },
        get password () {
          return faker.internet.password({ length: 9, pattern: /[a-zA-Z0-9!@#$%^&*)(+=._-]/ });
        },
        get email () {
          return faker.internet.email({ firstName: this.firstName, lastName: this.lastName });
        },
        get avatar () {
          return faker.internet.avatar();
        },
      }),
    },

    seeds (server) {
      const firstName = 'First';
      const lastName = 'Last';
      const helloUser = {
        username: 'hello',
        firstName,
        lastName,
        name: faker.person.fullName({ firstName, lastName }),
        email: faker.internet.email({ firstName, lastName }),
        password: 'p@ssword1'
      };
      // console.log(helloUser);
      server.create('user', helloUser);
      server.createList('user', 4);
    },

    routes () {
      // this.urlPrefix = 'http://localhost:9443'
      this.namespace = '/api';
      this.timing = 550;

      this.get('/users', (schema, request) => {
        // @ts-ignore
        // return schema?.users.all();
        /* return new Response(
          400,
          { some: "header" }, // headers
          { errors: ["name cannot be blank"] } // body
        ) */
        return new Response(200, {}, {
          data: {
            // @ts-ignore
            users: schema?.users.all().models
          }
        });
      });

      this.get('/actuator/health', () => ({
        status: 'UP',
      }));


      this.post('/auth/login', (schema, request) => {
        const username = _.get(JSON.parse(request.requestBody), 'username', null);
        // let now = new Date()
        // let cookieExpiration = new Date(now.getTime() + 24 * 3600 * 1000)
        // document.cookie = `remember_me=cookie-content-here; domain=.dev-domain; path=/; expires=${cookieExpiration.toUTCString()};`
        //
        // return schema.users.find(1)
        return new Response(200, {}, {
          data: {
            any: {}
          }
        });
      });

      this.post('/auth/validation/username', (schema, request) => {
        const username = _.get(JSON.parse(request.requestBody), 'username', null);

        if (!_.isEmpty(username)) {
          // @ts-ignore
          const res = schema?.users.findBy({ username });
          const userNameAlreadyExist = _.isEqual(_.get(res, 'attrs.username'), username);
          return new Response(200, {}, {
            data: {
              userNameAlreadyExist
            }
          });
        }

        return new Response(200, {}, {
          data: {
            userNameAlreadyExist: false
          }
        });
      });

      this.get('auth/register', () => ({
        status: 'UP',
      }));


      this.get('/auth/validate', () => ({
        status: 'UP',
      }));

      this.get('/auth/refresh', () => ({
        status: 'UP',
      }));

      this.get('/auth/logout', () => ({
        status: 'UP',
      }));

      /* this.get("/api/reminders/:id", (schema, request) => {
        let id = request.params.id
        return schema.users.find(id)
      }) */

      /* this.post("/api/reminders", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        console.log(attrs)
        debugger
      }) */
    },
  });
}
