// (function () {
//   //품의 모든 데이터를 가져와 객체로 반환하는 함수
//   function getFormData(form) {
//     console.log("run");
//     var elements = form.elements;
//     var honeypot;
//
//     //필터링된 필드 이름 목록 생성
//     var fields = Object.keys(elements)
//       .filter(function (k) {
//         // honeypot 필드 값 처리
//         if (elements[k].name === "honeypot") {
//           honeypot = elements[k].value;
//           return false;
//         }
//         return true;
//       })
//       .map(function (k) {
//         if (elements[k].name !== undefined) {
//           return elements[k].name;
//           // Edge 브라우더의 HTML 컬렉션에 대한 특별한 경우 처리
//         } else if (elements[k].length > 0) {
//           return elements[k].item(0).name;
//         }
//       })
//       .filter(function (item, pos, self) {
//         return self.indexOf(item) == pos && item;
//       });
//
//     //폼 데이터 객체 생성
//     var formData = {};
//     fields.forEach(function (name) {
//       var element = elements[name];
//
//       //단일 폼 요소는 하나의 값만 가짐
//       formData[name] = element.value;
//
//      //여러 항목을 가진 요소의 경우 각 값 가져오기
//       if (element.length) {
//         var data = [];
//         for (var i = 0; i < element.length; i++) {
//           var item = element.item(i);
//           if (item.checked || item.selected) {
//             data.push(item.value);
//           }
//         }
//         formData[name] = data.join(", ");
//       }
//     });
//
//     // 데이터에 폼 특정 값 추가
//     formData.formDataNameOrder = JSON.stringify(fields);
//     formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
//     formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
//
//     return { data: formData, honeypot: honeypot };
//   }
//  //폼 제출 이벤트 처리 함수
//   function handleFormSubmit(event) {
//     //jQuery를 사용하지 않고 폼 제출 처리
//     event.preventDefault(); //아래에서 xhr을 통해 제출하기 때문에 기본 동작 막음
//     var form = event.target;
//     var formData = getFormData(form);
//     var data = formData.data;
//
//     // honeypot 필드가 채워져 있다면 스팸 봇으로 가정하고 제출하지 않음
//     if (formData.honeypot) {
//       return false;
//     }
//
//     disableAllButtons(form);
//     var url = form.action;
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", url);
//     // xhr.withCredentials = true;
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4 && xhr.status === 200) {
//         form.reset();
//         var formElements = form.querySelector(".form-elements__box");
//         if (formElements) {
//           // formElements.style.display = "none";
//           // 폼 숨기기
//           console.log("none");
//         }
//         var thankYouMessage = form.querySelector(".thankyou_message");
//         if (thankYouMessage) {
//           thankYouMessage.style.display = "block";
//           console.log("block");
//           setTimeout(noneDisplay, 2000);
//         }
//       }
//     };
//     // URL 인코드된 폼 데이터를 전송용으로 변환
//     var encoded = Object.keys(data)
//       .map(function (k) {
//         return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
//       })
//       .join("&");
//     xhr.send(encoded);
//   }
//   //2초 후에 메세지를 숨기는 함수
//   function noneDisplay() {
//     // var thankYouMessage = form.querySelector(".thankyou_message");
//     var thankYouMessage = document.getElementById("thankyou_message");
//     var sendBtn = document.getElementById("sendBtn");
//     thankYouMessage.style.display = "none";
//     sendBtn.disabled = false;
//     sendBtn.style.background = "#140150";
//   }
//   //로드 완료 이벤트 처리
//   function loaded() {
//     // 폼의 submit 이벤트에 대해 리스너 등록
//     var forms = document.querySelectorAll("form.gform");
//     for (var i = 0; i < forms.length; i++) {
//       forms[i].addEventListener("submit", handleFormSubmit, false);
//     }
//     console.log("loaded");
//   }
//   document.addEventListener("DOMContentLoaded", loaded, false);
//
//   //모든 버튼을 비활성화 하는 함수
//   function disableAllButtons(form) {
//     var buttons = form.querySelectorAll("button");
//     for (var i = 0; i < buttons.length; i++) {
//       buttons[i].disabled = true;
//       buttons[i].style.background = "#666";
//     }
//   }
// })();
