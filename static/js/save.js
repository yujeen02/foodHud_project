const createData = (event) => {
  event.preventDefault();

  // 데이터 가져오기
  const inputFile = document.querySelector('input[name="image"]').files[0];
  const inputResName = document.querySelector('input[name="resName"]').value;
  const inputFoodName = document.querySelector('input[name="foodName"]').value;
  const inputComment = document.querySelector('input[name="comment"]').value;
  const inputPrice = document.querySelector('input[name="price"]').value;
  const inputDate = document.querySelector('input[name="date"]').value;
  const inputAddress = document.querySelector('input[name="address"]').value;

  // FormData 객체 생성
  const formData = new FormData();

  formData.append("image", inputFile);
  formData.append("resName", inputResName);
  formData.append("foodName", inputFoodName);
  formData.append("comment", inputComment);
  formData.append("price", inputPrice);
  formData.append("address", inputAddress);
  formData.append("date", inputDate);

  //  Axios를 사용 -> 서버로 데이터 전송
  axios({
    method: "post",
    url: "/save/post/test",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => {
      console.log("✅ 등록 성공:", res.data);
      alert("등록 성공");
      window.location.reload();
    })
    .catch((e) => {
      console.error("❌ 등록 실패:", e);
    });
};

// 삭제
const deletelist = (id) => {
  console.log(id);
  axios({
    method: "delete",
    url: `/save/delete/${id}`,
  })
    .then((res) => {
      console.log(res);
      alert("삭제 성공");
      window.location.reload();
    })
    .catch((e) => {
      console.log(e);
    });
};

// 수정페이지로 이동
const updatePage = (id) => {
  window.location.href = `/save/write/${id}`;
};
