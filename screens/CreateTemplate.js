export default function CreateTemplate() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    setError,
    control,
  } = useForm();

  const [createTemplateFunction, { loading, error }] = useMutation(
    CREATE_TEMPLATE_MUTATION,
    {
      onCompleted,
    }
  );

  const [createTemplateSetFunction, { loading, error }] = useMutation(
    CREATE_TEMPLATE_SET_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmitValid = (submissionData) => {
    if (loading) {
      return;
    }
    const { title, description } = getValues();
    createTemplateFunction({
      variables: { programId, title },
    });
  };

  const onCompleted = (data) => {
    const {
      createProgram: { ok, id, error },
    } = data;
    console.log(data.id);
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
  };

  useEffect(() => {
    register("title", {
      required: true,
    });
    register("description", {
      required: true,
    });
  }, [register]);

  return (
    <ScreenLayout>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={watch("title")}
            placeholder="프로그램 이름"
            placeholderTextColor="gray"
            onChangeText={(text) => setValue("title", text)}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={watch("description")}
            placeholder="프로그램 설명"
            placeholderTextColor="gray"
            onChangeText={(text) => setValue("description", text)}
          />
        )}
      />
      <ToggleContainer>
        <ColorText>Public</ColorText>
        <Switch
          trackColor={{ true: "#42a5f5" }}
          thumbColor="#FF7F50"
          ios_backgroundColor="gray"
          onValueChange={toggleSwitch}
          value={isPrivate}
        />
        <ColorText>Private</ColorText>
      </ToggleContainer>

      <View>
        <Controller
          name="workout"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={watch("workout")}
              placeholder="Workout title"
              placeholderTextColor="gray"
              onChangeText={(text) => setValue("workout", text)}
            />
          )}
        />
      </View>

      <MainButton
        text="새 프로그램 저장"
        loading={loading}
        disabled={!watch("title")}
        onPress={handleSubmit(onSubmitValid)}
      />
    </ScreenLayout>
  );
}
