export const environment = {
  production: false,
  //authApi: 'http://ec2-3-142-208-223.us-east-2.compute.amazonaws.com:5000/api/auth',
  //dataApi: 'http://ec2-3-142-208-223.us-east-2.compute.amazonaws.com:5001/api/Portfolio',
  authApi: 'https://localhost:44339/api/auth',
  dataApi: 'https://localhost:44347/api/Portfolio',
  endpoints: {
    login: '/login',
    refresh: '/refresh',
    getContacto: '/get_contact',
    getAptitudes: '/get_aptitudes',
    getExperiencia: '/get_experiencia',
    getFormacion: '/get_formacion',
    getSkills: '/get_skills',
    getTotalExperiencia: '/get_totalexperiencia',
  },
  auth: {
    username: 'luisrodj1990@gmail.com',
    password: 'MiPasswordSegura123'
  },  
};


