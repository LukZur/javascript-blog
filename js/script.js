/*constants declarations*/

const optArticleTagsSelector = '.post-tags .list';

const optArticleAuthorSelector = '.post-author';

/* LISTA TAGOW Z PRAWEJ*/
const optTagsListSelector = '.tags.list';

const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

/*variable declarations*/

/*functions declarations*/





/* eslint-disable no-undef */
function clearTitleLinks(list) {
  list.innerHTML = '';
}

function generateTitleLinks(customSelector = '') {
  /* [DONE]  remove contents of titleList */

  clearTitleLinks(titleList);

  const articleList = document.querySelectorAll('.post' + customSelector);
  let html = '';
  /* [DONE] for each article: */
  // eslint-disable-next-line no-undef
  for (article of articleList) {
    //   console.log(article);
    /* [DONE]  get the article id*/
    const articleID = article.getAttribute('id');
    //   console.log(articleID);
    /* [DONE] find the title element
       [DONE] get the title from the title element*/
    const articleTitle = article.querySelector('.post-title').innerHTML;
    //   console.log(articleTitle);
    /* [DONE] insert link into titleList*/
    const linkCode =
      '<li><a href="#' +
      articleID +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    //   console.log(linkCode);

    html = html + linkCode;
    //   console.log(html);
  }
  titleList.innerHTML = html;

  /* [DONE]  Funcionality to find titles and add click event handler is moved at the end of the generateTitleLinks function to do 
  this after the actual links were generated by the function*/
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

// eslint-disable-next-line no-unused-vars
function bubbleSort() {
  /* Getting numbers from sort from user and displaying them*/
  let numbersEntered = 'You entered such numbers: ';
  let sortedNumbers = '';
  let pivotNumber = 0;
  // console.log("length = " + sortedNumbers.length);
  // console.log("length = " + numbersEntered.length);
  // console.log(numbersEntered);
  for (i of sortArray) {
    //   console.log("Number from array: " + i);
    if (numbersEntered.length == 26) {
      numbersEntered = numbersEntered + i;
    } else {
      numbersEntered = numbersEntered + ', ' + i;
    }
  }
  console.log(numbersEntered);

  for (let x = 0; x < sortArray.length; x++) {
    for (let z = 0; z < sortArray.length; z++) {
      //   console.log("Number from numArray: " + sortArray[z]);

      if (sortOrder == 'A') {
        if (parseFloat(sortArray[z]) > parseFloat(sortArray[z + 1])) {
          pivotNumber = sortArray[z + 1];
          sortArray[z + 1] = sortArray[z];
          sortArray[z] = pivotNumber;
        }
      } else if (sortOrder == 'D') {
        if (parseFloat(sortArray[z]) < parseFloat(sortArray[z + 1])) {
          pivotNumber = sortArray[z + 1];
          sortArray[z + 1] = sortArray[z];
          sortArray[z] = pivotNumber;
        }
      }
      //   console.log("Sorted numbers: " + sortedNumbers);
    }
  }

  for (let z = 0; z < sortArray.length; z++) {
    if (sortedNumbers.length == 0) {
      sortedNumbers = sortedNumbers + sortArray[z];
    } else {
      sortedNumbers = sortedNumbers + ', ' + sortArray[z];
    }
  }

  /* Sorting the numbers and displaying them sorted in the way the user asked*/
  if (sortOrder != 'A' && sortOrder != 'D') {
    console.log('You entered invalid Sort order!!!');
  } else {
    console.log(
      'Here are the number sorted in the chosen manner(' +
      sortOrder +
      '):' +
      '\n' +
      sortedNumbers
    );
  }
}

function calculateTagsParams(tags) {
  const returnObj = {
    max: 0,
    min: 0
  };

  // for (let tag in tags) {
  for (let tag in tags) {
    if (returnObj['max'] == 0 && returnObj['min'] == 0) {
      returnObj['max'] = tags[tag];
      returnObj['min'] = tags[tag];
    } else {
      if (returnObj['max'] < tags[tag]) {
        returnObj['max'] = tags[tag];
      }
      if (returnObj['min'] > tags[tag]) {
        returnObj['min'] = tags[tag];
      }
    }
  }
  // }

  // console.log('returnObj[min] = ' + returnObj['min']);
  // console.log('returnObj[max] = ' + returnObj['max']);
  return returnObj;

}

function calculateTagClass(count, params) {

  // count = allTags[tag] = liczba wyświetleń danego tagu
  // params = tagsParams = obiekt z max i min
  let optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';
  let outputTagSize = '';
  let countPercentage = 0.2;

  // 1) take max and min number of occurrences of a tag = take max from params and make it 100% 
  const maxOccurrences = params['max'];
  // const minOccurrences = params['min'];

  // console.log('maxOccurrences', maxOccurrences);
  // console.log('minOccurrences', minOccurrences);

  // 2) if we know that there are 5 tag-size classes, we can prepare 5 20% ranges for occurrences

  while (countPercentage < 1.01) {
    // console.log('count', count);
    // console.log('maxOccurrences', maxOccurrences);
    // console.log('countPercentage', countPercentage);
    // console.log('Math.ceil((maxOccurrences * countPercentage))', Math.ceil((maxOccurrences * countPercentage)));
    // console.log('optCloudClassCount', optCloudClassCount);
    // console.log('Math.ceil(maxOccurrences * (1 - countPercentage))', Math.ceil(maxOccurrences * (1 - countPercentage)));
    if (count <= (maxOccurrences * countPercentage)) { //Math.ceil((maxOccurrences * countPercentage))
      optCloudClassCount -= Math.ceil(maxOccurrences * (1 - countPercentage));
      outputTagSize = optCloudClassPrefix + optCloudClassCount;
      break;
    }
    countPercentage += 0.2;
  }
  // return 'tag-size-5';
  return outputTagSize;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */

  const allArticles = document.querySelectorAll('.post');

  // console.log(allArticles);

  /* START LOOP: for every article: */

  for (article of allArticles) {

    /* find tags wrapper */
    let tagsWrapper = article.querySelector(optArticleTagsSelector);


    // console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    let articleTags = article.getAttribute('data-tags');

    // console.log(articleTags);

    /* split tags into array */

    articleTags = articleTags.split(' ');

    // console.log(articleTags);

    // allTags['cat'] = 1;

    /* START LOOP: for each tag */
    for (articleTag of articleTags) {
      // console.log('articleTag z petli = ', articleTag);
      // console.log('allTags[articleTag]', allTags[articleTag])

      /* generate HTML of the link */

      const linkHtml = '<li><a href="#tag-' + articleTag + '">' + articleTag + '</a></li>' + '\n';

      // console.log('linkHTML = ' + linkHtml);
      /* add generated code to html variable */
      html = html + linkHtml;

      // console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if ((!allTags[articleTag]) /*== -1*/) { //allTags.indexOf(linkHtml)
        // /* [NEW] add generated code to allTags array */
        // console.log('allTags.indexOf(linkHTML) = ' + allTags.indexOf(linkHtml));
        // allTags.push(linkHtml);
        /* [NEW] add tag to allTags object */
        allTags[articleTag] = 1;
        // console.log('allTags w petli 1', allTags);
      } else {
        allTags[articleTag]++;
        // allTags[articleTag] = allTags[articleTag] +   parseFloat(1);
        // console.log('allTags w petli ++', allTags);
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = tagsWrapper.innerHTML + html;
    // console.log(tagsWrapper.innerHTML);

    /* END LOOP: for every article: */

  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  console.log('allTags', allTags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  // console.log('allTags', allTags);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    console.log('tag = ', tag);
    // allTagsHTML += '<a href="#tag-' + tag + '" class ="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '(' + allTags[tag] + ') </a>' + '\n';
    allTagsHTML += '<a href="#tag-' + tag + '" class ="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a>' + '\n';
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log('allTagsHTML', allTagsHTML);

  // let tagsActive = document.querySelector('.posts .active');
  // // console.log(tagsActive);

}

// eslint-disable-next-line no-unused-vars
function tagClickHandler(event) {
  // console.log('function tagClickHandler was run 1');
  /* prevent default action for this event */
  event.preventDefault();

  // console.log('function tagClickHandler was run');

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  // console.log('href of clicked element = ' + href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  // console.log('tag of clicked element = ' + tag);

  /* find all tag links with class active */
  let tagsActive = document.querySelectorAll('a.active[href ^= "#tag-"]');
  // console.log('tagsActive = ' + tagsActive);

  /* START LOOP: for each active tag link */
  for (activeTag of tagsActive) {

    /* remove class active */
    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(tagLinks);
  /* START LOOP: for each found tag link */
  for (tagLink of tagLinks) {

    /* add class active */
    tagLink.classList.add('active');
    // console.log('added active class to tag');
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

// function addClickListenersToTags() {
//   /* find all links to tags */
//   // const clickedElement = this;
//   // console.log('clickedElement:', clickedElement);
//   // const href = clickedElement.getAttribute('href');
//   // document.querySelectorALL('a.active[href ^= "#tag-"]');
//   const tagsLinks = document.querySelectorALL('.post a.active[href^="#tag-"]'); // a[href="#tag-eagle"]
//   // const tagLinks = document.querySelectorALL('a[href="' + href + '"]');
//   console.log(tagsLinks);

//   // const linksToTags = document.querySelectorALL('.post-tags .list');
//   //document.querySelectorALL('.post-tags .list a[href="' + href + '"]');
//   // console.log(linksToTags);

//   /* START LOOP: for each link */
//   // for (tagLink of tagLinks) {

//   //   /* add tagClickHandler as event listener for that link */
//   //   tagLink.addEventListener('click', tagClickHandler);
//   //   /* END LOOP: for each link */
//   // }
//   // }
// }

function addClickListenersToTags() {
  // console.log('function addClickListenersToTags');
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post a[href^="#tag-"]');
  const tagRightLinks = document.querySelectorAll('.tags a[href^="#tag-"]');
  //document.querySelectorAll('.titles');
  // console.log(tagLinks);
  /* START LOOP: for each link */
  for (tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
  for (tagLink of tagRightLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

function generateAuthors() {

  /*find all articles */
  const allArticles = document.querySelectorAll('.post');
  // console.log(allArticles);
  /* find all authors and assign them to a constant*/
  const allAuthors = document.querySelectorAll(optArticleAuthorSelector);
  // console.log(allAuthors);

  for (article of allArticles) {

    /* find tags wrapper */
    let authorsWrapper = article.querySelector('.post-author');

    // console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    let articleAuthor = article.getAttribute('data-author');

    // console.log(articleAuthor);

    /* generate HTML of the link */
    const linkHtml = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>' + '\n';

    // console.log('linkHTML = ' + linkHtml);
    /* add generated code to html variable */
    html = html + linkHtml;


    /* insert HTML of all the links into the tags wrapper */
    authorsWrapper.innerHTML = authorsWrapper.innerHTML + html;
    // console.log(tagsWrapper.innerHTML);

    /* END LOOP: for every article: */

  }
}

function authorClickHandler(event) {
  // console.log('function tagClickHandler was run 1');
  /* prevent default action for this event */
  event.preventDefault();

  // console.log('function tagClickHandler was run');

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  // console.log('href of clicked element = ' + href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  // console.log('tag of clicked element = ' + tag);

  /* find all tag links with class active */
  let authorsActive = document.querySelectorAll('a.active[href ^= "#author-"]');
  // console.log('tagsActive = ' + tagsActive);

  /* START LOOP: for each active tag link */
  for (activeAuthor of authorsActive) {

    /* remove class active */
    activeAuthor.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(tagLinks);
  /* START LOOP: for each found tag link */
  for (authorLink of authorLinks) {

    /* add class active */
    authorLink.classList.add('active');
    // console.log('added active class to tag');
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  // console.log('function addClickListenersToTags');
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('.post a[href^="#author-"]');
  //document.querySelectorAll('.titles');
  // console.log(authorLinks);
  /* START LOOP: for each link */
  for (authorLink of authorLinks) {

    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

//zmiany w generateTags są dodane z tego modułu

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
/*body of the script*/

('use strict');

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE]  remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  // console.log("activelinks = " + activeLinks);
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE]   add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');

  /* [DONE]  remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE]   get 'href' attribute from the clicked link */

  const hrefAttr = clickedElement.getAttribute('href');

  console.log('hrefAttr:', hrefAttr);

  /* [DONE]   find the correct article using the selector (value of 'href' attribute) */

  const getArticle = document.querySelector(hrefAttr);

  console.log('getArticle:', getArticle);

  /* [DONE]   add class 'active' to the correct article */

  getArticle.classList.add('active');
};

const titleList = document.querySelector('.titles');

generateTitleLinks();

generateTags();

addClickListenersToTags();

generateAuthors();

addClickListenersToAuthors();

////////////////////////////////////////////////////BUBBLE SORT

/* Getting numbers from sort from user and displaying them*/
// let sortArray = prompt(
//   'Please enter comma separated numbers to sort: '
// ).split(',');
// /*asking the user how they want to have the numbers sorted*/
// const sortOrder = prompt(
//   'Please enter how you would like to have your numbers sorted (A - for Ascending; D - for Descending): '
// );

//   const elementForSort = document.querySelector(".sidebar").innerHTML;
//   console.log(elementForSort);

//   const resultSort = bubbleSort(sortArray);
// bubbleSort();