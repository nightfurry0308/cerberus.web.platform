import Setting from "../../components/Setting"

export default () => (
  <>
    <h2 className='text-center mb-0 text-4xl'>
      Global Settings
    </h2>
    <p className="text-center text-stone-400 mb-3">
      All settins are saved automatically once changed.
    </p>
    <div className='m-auto !w-[1000px]'>
      <Setting />
    </div>
  </>)