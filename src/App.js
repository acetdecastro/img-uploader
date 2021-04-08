import './App.css';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const TEST_UPLOAD = gql`
  mutation testUpload($doc: Upload) {
    testUpload(doc: $doc)
  }
`;

const TEST_UPLOAD_MULTIPLE = gql`
  mutation testUploadMultiple($docs: [Upload]) {
    testUploadMultiple(docs: $docs)
  }
`;

const TEST_UPLOAD_MULTIPLE_WA = gql`
  mutation testUploadMultipleWithAttributes(
    $data: [SampleDocUploadWithAttr!]!
  ) {
    testUploadMultipleWithAttributes(data: $data)
  }
`;

const handleOnSubmit = async (event) => {
  event.preventDefault();

  console.log({
    v: event.target['doc'].value,
    event,
    target: event.target,
  });
};

function App() {
  const [mutate, { loading }] = useMutation(TEST_UPLOAD);
  const [mutateMultiple, multipleData] = useMutation(TEST_UPLOAD_MULTIPLE);
  const [mutateWA, multipleWA] = useMutation(TEST_UPLOAD_MULTIPLE_WA);
  return (
    <div className="App">
      <form onSubmit={(e) => handleOnSubmit(e)}>
        {/* <input
          type="file"
          name="doc"
          id="doc"
          onChange={async (ev) => {
            const file = ev.target.files[0];

            console.log({ file });

            const { data } = await mutate({
              variables: { doc: file },
            });

            console.log({ data });
          }}
        /> */}

        <br />

        {/* <input
          type="file"
          name="docs"
          id="docs"
          multiple
          placeholder="Multiple"
          onChange={async (ev) => {
            console.log({ files: ev.target.files });

            const { data } = await mutateMultiple({
              variables: { docs: ev.target.files },
            });

            console.log({ data });
          }}
        /> */}

        <input
          type="file"
          name="docs"
          id="docs"
          multiple
          placeholder="Multiple"
          onChange={async (ev) => {
            const files = ev.target.files;

            console.log({ files });

            if (files.length === 0) return null;

            let payload = [];

            for (const f of files) {
              payload.push({
                doc: f,
                patientId: 'yo',
                doctorId: 'hey',
              });
            }

            const { data } = await mutateWA({
              variables: { data: payload },
            });

            console.log({ data });
          }}
        />

        <button type="submit">
          {loading || multipleData.loading || multipleWA.loading
            ? 'loading...'
            : 'submit'}
        </button>
      </form>
    </div>
  );
}

export default App;
