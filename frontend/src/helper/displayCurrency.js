// const displayCurrency = (num) => {
//     const formatter = new Intl.NumberFormat('en-NG', {
//         style: "currency",
//         currency: 'NGN',
//         minimumFractionDigits:2
//     });
//     return formatter.format(NumberFormat);
// }

// export default displayCurrency;


const displayCurrency = (num) => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });

  return formatter.format(Number(num)); // ✅ use the parameter, not NumberFormat
};

export default displayCurrency;
