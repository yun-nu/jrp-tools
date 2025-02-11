interface IEmpty {
  resourceName: string;
}

function Empty({ resourceName }: IEmpty) {
  return <p>No {resourceName} could be found.</p>;
}

export default Empty;
