import { TestBed } from '@angular/core/testing';

import { UserServiceService } from './user-service.service';
import { User } from '../../model/user';

describe('UserServiceService', () => {
  let service: UserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });





  it('should get a user by id',()=>{

    service.getDataUsers().subscribe((usrs)=>{
      service.users = usrs;
    });

    expect(service.getUserById(1)).toBe({
      id: 1,
      nombres: 'Pablo',
      apellidos: 'Garrido Cid',
      correo: 'pa.garrido.cid@gmail.com',
      rol: 1,
      username: 'admin',
      pass: 'Pass1010!',
      calle: 'av el roble',
      numeracion: '15151',
      comuna: 'santiago',
      fecha_nac: '1995-05-06'
    },);
  });

  it('Should get all users',()=>{
    // let users :User[]= [];
    service.getDataUsers().subscribe((users)=>{
      expect(users).toBeTruthy();
    });
  });
  it('should get all users 2', () => {
    const usersMock: User[] = [
      {
        id: 1,
        nombres: 'Pablo',
        apellidos: 'Garrido Cid',
        correo: 'pa.garrido.cid@gmail.com',
        rol: 1,
        username: 'admin',
        pass: 'Pass1010!',
        calle: 'av el roble',
        numeracion: '15151',
        comuna: 'santiago',
        fecha_nac: '1995-05-06'
      },
      {
        id: 2,
        nombres: 'Javier',
        apellidos: 'Gonzalez',
        correo: 'javier@gmail.com',
        rol: 3,
        username: 'javiercito',
        pass: 'Pass1010!',
        calle: '',
        numeracion: '',
        comuna: '',
        fecha_nac: '1995-05-05'
      },
      {
        id: 3,
        nombres: 'Paulina',
        apellidos: 'Pinto',
        correo: 'pauli@gmail.com',
        rol: 2,
        username: 'pauli',
        pass: 'Pass1010!',
        calle: 'av el manzano',
        numeracion: '56555',
        comuna: 'santiago',
        fecha_nac: '1995-05-06'
      },
      {
        id: 4,
        nombres: 'Francisca',
        apellidos: 'Gonzalez',
        username: 'fran',
        rol: 3,
        pass: 'Pass1010!',
        calle: '',
        numeracion: '',
        correo: 'fran@gmail.com',
        fecha_nac: '2024-07-11',
        comuna: ''
      }
    ];
    

    service.getDataUsers().subscribe(users => {
      expect(users.length).toBe(3);
      expect(users).toEqual(usersMock);
    });

  });

});
