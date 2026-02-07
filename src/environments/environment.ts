export const environment = {
  production: true,
  authApi: 'http://ec2-3-142-208-223.us-east-2.compute.amazonaws.com:5000/api/auth',
  dataApi: 'http://ec2-3-142-208-223.us-east-2.compute.amazonaws.com:5001/api/Portfolio',
  endpoints: {
    login: '/login',
    refresh: '/refresh',
    getContacto: '/Get_Contact',
    getAptitudes: '/Get_Aptitudes',
    getExperiencia: '/Get_Experiencia',
    getFormacion: '/Get_Formacion',
    getSkills: '/Get_Skills',
    getTotalExperiencia: '/Get_TotalExperiencia',
  },
  auth: {
    username: 'luisrodj1990@gmail.com',
    password: 'MiPasswordSegura123'
  },
};
