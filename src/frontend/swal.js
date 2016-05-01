import swal from 'sweetalert';

const gbgSwal = (params, callback) => swal({
  allowOutsideClick: true,
  confirmButtonColor: '#0094d8',
  cancelButtonColor: '#A32514',
  ...params
}, callback);

export default gbgSwal;
