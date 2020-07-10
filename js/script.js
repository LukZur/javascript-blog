{
  ("use strict");

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log("Link was clicked!");
    console.log(event);

    /* [DONE]  remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll(".titles a.active");

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    /* [DONE]   add class 'active' to the clicked link */

    console.log("clickedElement:", clickedElement);

    clickedElement.classList.add("active");

    /* [DONE]  remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll(".posts article.active");

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    /* [DONE]   get 'href' attribute from the clicked link */

    const hrefAttr = clickedElement.getAttribute("href");

    console.log("hrefAttr:", hrefAttr);

    /* [DONE]   find the correct article using the selector (value of 'href' attribute) */

    const getArticle = document.querySelector(hrefAttr);

    console.log("getArticle:", getArticle);

    /* [DONE]   add class 'active' to the correct article */

    getArticle.classList.add("active");
  };

  const titleList = document.querySelector(".titles");

  function clearTitleLinks(list) {
    list.innerHTML = "";
  }

  function generateTitleLinks() {
    /* usuń zawartość listy linków w lewej kolumnie */

    clearTitleLinks(titleList);

    const articleList = document.querySelectorAll(".post");
    let html = "";
    /*następnie dla każdego artykułu: */
    for (article of articleList) {
      //   console.log(article);
      /* odczytaj jego id i zapisz je do stałej*/
      const articleID = article.getAttribute("id");
      //   console.log(articleID);
      /*znajdź element z tytułem i zapisz jego zawartość do stałej*/
      const articleTitle = article.querySelector(".post-title").innerHTML;
      //   console.log(articleTitle);
      /*na podstawie tych informacji stwórz kod HTML linka i zapisz go do stałej*/
      const linkCode =
        '<li><a href="#' +
        articleID +
        '"><span>' +
        articleTitle +
        "</span></a></li>";
      //   console.log(linkCode);

      html = html + linkCode;
      //   console.log(html);
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll(".titles a");

    for (let link of links) {
      link.addEventListener("click", titleClickHandler);
    }
  }
  generateTitleLinks();
}
