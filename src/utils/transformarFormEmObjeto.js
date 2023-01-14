export default function transformarFormEmObjeto(formEl) {
  const formIpunts = [...formEl.current.elements].filter(
    (element) => element.type !== 'submit'
  );

  return formIpunts.reduce((acc, input) => {
    return {
      ...acc,
      [input.name]: input.value
    }
  }, {});
}
