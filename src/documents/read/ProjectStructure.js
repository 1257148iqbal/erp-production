import axios from 'axios';
import marked from 'marked';
import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';

const ProjectStructure = () => {
  const url = 'https://raw.githubusercontent.com/shsohel/ERP/main/ProjectStructuralDoc.md';

  const [read, setRead] = useState('');

  useEffect(() => {
    axios.get(url).then(response => {
      setRead(response.data);
    });
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          <section>
            <article dangerouslySetInnerHTML={{ __html: marked(read) }}></article>
          </section>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectStructure;
