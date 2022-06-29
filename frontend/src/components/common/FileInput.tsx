import { useState } from "react"

interface FileInputType {
  label: string
  onChange: any
}

export default (props: FileInputType) => {
  return (
    <div className="text-center flex">
      <label className="border border-solid border-stone-700 rounded-sm inline-block cursor-pointer px-3 py-1 w-full">
        <input type="file" className="!hidden" onChange={props.onChange}/> {props.label}
      </label>
    </div>
  )
}