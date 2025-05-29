import toast from "react-hot-toast";

export const getBloodDonations = () => {
  let donations = [];
  const storedData = localStorage.getItem("bloodDonations");
  if (storedData) {
    donations = JSON.parse(storedData);
  }
  return donations;
};

//save
export const saveBloodDonation = (donation) => {
  let donations = getBloodDonations();
  const isExist = donations.find((d) => d.id === donation.id);
  if (isExist) {
    return toast.error("This donation record already exists");
  }
  donations.push(donation);
  localStorage.setItem("bloodDonations", JSON.stringify(donations));
  toast.success("Blood Donation Record Saved Successfully");
};

//delete
export const deleteBloodDonation = (id) => {
  let donations = getBloodDonations();
  const remaining = donations.filter((d) => d.id !== id);
  localStorage.setItem("bloodDonations", JSON.stringify(remaining));
  toast.success("Blood Donation Record Removed Successfully");
};
