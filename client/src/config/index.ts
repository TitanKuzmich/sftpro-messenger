export default {
  baseUrl: "/api/v1.1",
  paths: {
    auth: "/auth",
    register: "/auth/new",
    users: "/users"
  },

  formatDate: "MM.DD.YYYY",
  formatDateTime: "MM.DD.YYYY HH:mm",

  listLimitDefault: 25,
  inputSearchTimeout: 1000,
  defaultLimitPagination: 25,
  defaultCurrentPage: 1
}
