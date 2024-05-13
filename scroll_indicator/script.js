window.addEventListener("scroll", () => {
  const webHeight = document.documentElement.scrollHeight;
  const windowHeight = document.documentElement.clientHeight;
  const scrollUpto = document.documentElement.scrollTop;

  const scrolledParsentage = (scrollUpto / (webHeight - windowHeight)) * 100;
  document.querySelector(".progress").style.width = scrolledParsentage + "%";
});
