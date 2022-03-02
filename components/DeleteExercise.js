const DELETE_EXERCISE_MUTATION = gql`
  mutation deleteExercise($id: Int!) {
    deleteExercise(id: $id) {
      ok
      error
    }
  }
`;

const [deleteExerciseMutation] = useMutation(DELETE_EXERCISE_MUTATION, {
  variables: {
    id,
  },
});

const onClickDeleteExercise = () => {
  deleteExerciseMutation();
};
