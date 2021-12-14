import { User } from "@database/models/user.model"

const users = [
  {
    username: 'tiSai',
    crypted_password: '21048e402946482342d03c45f4edcdffdcc3e13c',
    salt: "21e36739-9857-4a07-9d77-211444867174",
    aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_cersei_avi_e5bdgj.png"
  },
  {
    username: 'Kaneki',
    crypted_password: '21048e402946482342d03c45f4edcdffdcc3e13c',
    salt: "21e36739-9857-4a07-9d77-211444867174",
    aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_dany_avi_kpx7xn.png"
  },
  {
    username: 'Saitama',
    crypted_password: '21048e402946482342d03c45f4edcdffdcc3e13c',
    salt: "21e36739-9857-4a07-9d77-211444867174",
    aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_hound_avi_nwv7ld.png"
  },
  {
    username: 'Tanjiro',
    crypted_password: '21048e402946482342d03c45f4edcdffdcc3e13c',
    salt: "21e36739-9857-4a07-9d77-211444867174",
    aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_jaime_avi_pazpyr.png"
  },
]

export default {
  model: User,
  data: users,
  initMethod: null
}
