import axios from "axios";

const apiUrl = 'http://localhost:3030/customer';

const postCustomerData = async (name, address) => {
    debugger
    console.log("posting data");
 await axios.post(apiUrl, {
    name: name,
    address: address,
  })
  .then(response => {
    console.log('Customer created successfully');
    console.log('Customer ID:', response.data.customerId);
  })
  .catch(error => {
    console.error('Error creating customer:', error.response);
  });
}

export default postCustomerData;