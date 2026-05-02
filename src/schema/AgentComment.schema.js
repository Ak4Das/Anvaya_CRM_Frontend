import * as yup from "yup"

export const agentCommentSchema = yup.object({
  author: yup.string().required("Please select a author"),
  commentText: yup.string().required("Please write a comment"),
})
