export default function EditFoodForm() {
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log('You are trying to submit the form that is NYI.');
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Food Form</h2>
      <button type={'submit'}>Submit</button>
    </form>
  );
}
