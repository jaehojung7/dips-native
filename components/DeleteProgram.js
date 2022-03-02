const DELETE_PROGRAM_MUTATION = gql`
  mutation deleteProgram($id: Int!) {
    deleteProgram(id: $id) {
      ok
      error
    }
  }
`;

const [deleteProgramMutation] = useMutation(DELETE_PROGRAM_MUTATION, {
  variables: {
    id,
  },
});

const onClickDeleteProgram = () => {
  deleteProgramMutation();
};
