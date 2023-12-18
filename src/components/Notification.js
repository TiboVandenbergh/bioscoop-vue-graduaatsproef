import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

const Notifications = (props) => {
  const { tekst, type } = props;

  const notify = (tekst, type) => {
    if (type === 'success') {
      toast.success(tekst, {
        position: "bottom-right",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } 
    if (type === 'error') {
      toast.error(tekst, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }   
  };

  return notify(tekst, type);
};

export default Notifications;