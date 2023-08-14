function loadExternalJS() {
  // 필요한 파일들을 동적으로 생성해줍니다.
  const scriptJquery = document.createElement("script");
  scriptJquery.src = "./MainSidebarJS";
  scriptJquery.async = true;

  // const scriptPlugin = document.createElement("script");
  // scriptJquery.src = "./js/plugin.js";
  // scriptJquery.async = true;

  // 생성된 script 요소들을 body에 붙여주세요
  document.body.appendChild(scriptJquery);
  //document.body.appendChild(scriptPlugin);
}

export default loadExternalJS;
