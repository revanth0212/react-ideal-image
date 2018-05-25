Click icons to see what happens

```js
const lqip =
  'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAA4DASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUG/8QAIRAAAQQDAAEFAAAAAAAAAAAAAQIDBREABAYhEjEyQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/8QAGBEBAAMBAAAAAAAAAAAAAAAAAQACIRH/2gAMAwEAAhEDEQA/AMJ2DG+7Dw0nz8gsx+uyhlxnWdLakOlfzpIF3aRf1WT5t96P5+N1ug9Tu7ZWS8q1gG6B8H2FDz+YxhjUrEOdZ//Z'
;<table>
  <tbody>
    <tr>
      <th />
      <th>Online</th>
      <th>Offline</th>
    </tr>
    <tr>
      <th align="left">Ok</th>
      <td>
        <ManualLoadWithDefaults
          width={3500}
          height={2095}
          placeholder={{lqip: lqip}}
          style={{maxWidth: 200}}
          onLine={true}
          src="andre-spieker-238-unsplash.jpg"
        />
      </td>
      <td>
        <ManualLoadWithDefaults
          width={3500}
          height={2095}
          placeholder={{lqip: lqip}}
          style={{maxWidth: 200}}
          onLine={false}
          src="andre-spieker-238-unsplash.jpg"
        />
      </td>
    </tr>
    <tr>
      <th align="left">Error</th>
      <td>
        <ManualLoadWithDefaults
          width={3500}
          height={2095}
          placeholder={{lqip: lqip}}
          style={{maxWidth: 200}}
          onLine={true}
          src="/404.jpg"
        />
      </td>
      <td>
        <ManualLoadWithDefaults
          width={3500}
          height={2095}
          placeholder={{lqip: lqip}}
          style={{maxWidth: 200}}
          onLine={false}
          src="/404.jpg"
        />
      </td>
    </tr>
  </tbody>
</table>
```