const updateForm = (id) => {
  const inputFile = document.querySelector('input[name="image"]').files[0];
  const inputSubFile1 = document.querySelector('input[name="subImage1"]')
    .files[0];
  const inputSubFile2 = document.querySelector('input[name="subImage2"]')
    .files[0];

  const inputResName = document.querySelector('input[name="resName"]').value;
  const inputFoodName = document.querySelector('input[name="foodName"]').value;
  const inputComment = document.querySelector('input[name="comment"]').value;
  const inputPrice = document.querySelector('input[name="price"]').value;
  const inputAddress = document.querySelector('input[name="address"]').value;
  const inputRating = document.querySelector('input[name="rating"]').value;

  const formData = new FormData();

  formData.append("image", inputFile);
  formData.append("subImage1", inputSubFile1);
  formData.append("subImage2", inputSubFile2);
  formData.append("resName", inputResName);
  formData.append("foodName", inputFoodName);
  formData.append("comment", inputComment);
  formData.append("price", inputPrice);
  formData.append("address", inputAddress);
  formData.append("rating", inputRating);

  console.log("수정 요청 데이터:", formData);

  axios({
    method: "put",
    url: `/save/update/${id}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => {
      console.log("수정 성공:", res.data);
      alert("수정 성공");
      window.location.reload();
    })
    .catch((e) => {
      console.error("수정 실패:", e);
    });
};
