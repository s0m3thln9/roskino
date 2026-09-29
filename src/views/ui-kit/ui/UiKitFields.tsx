'use client';

import { useState } from 'react';
import { PasswordField, SearchField, TextField } from '@/shared/ui';

const passwordLabels = { show: 'Show', hide: 'Hide' };
const noop = () => {};

export function UiKitFields() {
  const [search, setSearch] = useState('Короткий метр');
  const [text, setText] = useState('Text input');

  return (
    <div className="flex w-full flex-col gap-15">
      <div className="flex w-full max-w-138 flex-col gap-4">
        <SearchField placeholder="Search any word or news date" />
        <SearchField
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onClear={() => setSearch('')}
          clearLabel="Clear"
        />
      </div>

      <div className="grid w-full max-w-138 gap-4">
        <PasswordField placeholder="Text input" labels={passwordLabels} />
        <PasswordField placeholder="Text input" defaultVisible labels={passwordLabels} />
        <PasswordField defaultValue="FL43%2190" defaultVisible labels={passwordLabels} />
        <PasswordField defaultValue="FL43%2190" labels={passwordLabels} />
        <PasswordField defaultValue="FL43%2190" defaultVisible error labels={passwordLabels} />
        <PasswordField defaultValue="FL43%2190" error labels={passwordLabels} />
      </div>

      <div className="grid w-full max-w-138 gap-4">
        <TextField label="Text input" value="" onChange={noop} />
        <TextField
          label="Text input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onClear={() => setText('')}
          clearLabel="Clear"
        />
        <TextField label="Text input" value="Text input" onChange={noop} error />
      </div>
    </div>
  );
}
