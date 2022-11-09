export const filterDivSearch = () => {
  const nameSearchJS = document.querySelector(".nameSearch").value;
  const divSearch = document.querySelector(".divSearch");

  if (nameSearchJS.trim() !== '') {
    divSearch.classList.add("active");
  } else {
    divSearch.classList.remove("active");
  }
};


