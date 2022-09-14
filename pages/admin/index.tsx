import CachedUniversityLayout from "../../common/Layout/CacheUniversityLayout"
import PageWithLayoutType from "../../types/PageWithLayout"

export interface AdminPageProps{

}
const AdminPage = (props:AdminPageProps) =>{
    return(
        <div>Admin Page</div>
    )
}

(AdminPage as PageWithLayoutType).layout = CachedUniversityLayout
export default AdminPage