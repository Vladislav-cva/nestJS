// import { EntitySchema } from "typeorm";
// import { Projects } from "./projects.entity";


// export const ProjectSchema = new EntitySchema<Projects>({
//   name: 'Projects',
//   target: Projects,
//   columns: {
//     id: {
//       type: Number,
//       primary: true,
//       generated: true,
//     },
//     name: {
//         type: String
//     },
//     description: {
//       type: String,
//     },
// },
//     relations : {
//         features:{
//             type: 'one-to-many',
//             target: 'FeaturesSchema'
//         }
//     }

// })