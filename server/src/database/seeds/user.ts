const users = [
  {
    username: 'tiSai',
    password: 'testpass',
    salt: "test",
    aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_cersei_avi_e5bdgj.png"
  },
  {
    username: 'Kaneki',
    password: 'testpass',
    salt: "test",
    aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_dany_avi_kpx7xn.png"
  },
  {
    username: 'Saitama',
    password: 'testpass',
    salt: "test",
    aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_hound_avi_nwv7ld.png"
  },
  {
    username: 'Tanjiro',
    password: 'testpass',
    salt: "test",
    aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_jaime_avi_pazpyr.png"
  },
]

export default {
  model: "User",
  data: users
}
