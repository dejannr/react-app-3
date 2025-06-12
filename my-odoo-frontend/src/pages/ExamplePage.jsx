import React from 'react'
import DataFetcher from '../components/DataFetcher.jsx'
import FetchForm   from '../components/FetchForm.jsx'

export default function ExamplePage() {
  // ——— 1) Your fetcher customization — endpoint, title, params, etc.
  const chatConfig = {
    endpoint: '/chat_page',
    params: {},
    auto: true,
    title: '🔄 Chat Page Data',
  }

  // ——— 2) Your form-schema customization
  const helloFormSchema = {
    id: 'hello_form',
    fields: [
      {
        name: 'name',
        label: 'Your Name',
        widget: 'text',
        required: true,
        placeholder: 'e.g. Alice',
      },
      {
        name: 'age',
        label: 'Your Age',
        widget: 'number',
      },
      {
        name: 'gender',
        label: 'Gender',
        widget: 'select',
        required: true,
        options: [
          { label: 'Male',   value: 'male'   },
          { label: 'Female', value: 'female' },
          { label: 'Other',  value: 'other'  },
        ],
        placeholder: 'Select gender',
      },
    ],
  }

  // ——— 3) The POST endpoint for your form
  const formConfig = {
    endpoint: '/submit_form',
    title: '✉️ Send Hello Form',
    schema: helloFormSchema,
  }

  return (
    <div style={{ padding: '1rem' }}>
      {/* ——— DataFetcher */}
      <DataFetcher
        endpoint={chatConfig.endpoint}
        params={chatConfig.params}
        auto={chatConfig.auto}
        title={chatConfig.title}
      />

      <hr style={{ margin: '2rem 0' }}/>

      {/* ——— FetchForm */}
      <FetchForm
        endpoint={formConfig.endpoint}
        schema={formConfig.schema}
        title={formConfig.title}
      />
    </div>
  )
}
