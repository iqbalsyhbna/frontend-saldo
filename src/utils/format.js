import moment from "moment";

export const formatDate = (date) => moment(date).format("DD MMM YYYY");

export const formatCurrency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
