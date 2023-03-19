import { ThreeDots } from 'react-loader-spinner'

const Loading = () => {
    return (
        <ThreeDots
            height="11"
            width="43"
            radius="9"
            color="#FFFFFF"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    )
}

export { Loading };