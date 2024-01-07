<template>
    <div class="p-4">
        <table id="myTable" class="display">
            <thead>
            <tr>
                <th>avatar</th>
                <th>name</th>
                <th>Listing</th>
                <th>state</th>
                <th>city</th>
                <th>street</th>
                <th>Zip code</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</template>

<script >
import use_users from '@/CRUD/user'
import DataTable from 'datatables.net-dt';

export default {
    mounted() {
        this.get_users().then((res)=>{
            let data = res.data.filter((r)=>{
                return r.type === 'landlord'
            })
            let table = new DataTable('#myTable', {
                data: data,
                columns: [
                    { data: 'avatar' },
                    { data: 'name' },
                    { data: 'Listing' },
                    { data: 'state' },
                    { data: 'city' },
                    { data: 'street' },
                    { data: 'zip_code' },
                ],
                responsive:true,
                columnDefs: [
                    {
                        render: (data, type, row) => {
                            return '<div class="w-10 h-10 bg-no-repeat bg-center bg-cover" style="background-image: url(data:image/png;base64,'+data+')"></div>'
                        },
                        targets: 0
                    },
                    {
                        render: (data, type, row) => {
                            return '<div class="flex flex-col gap-2" ><b>'+row.name+'</b><div class="text-xs">'+row.email+'</div></div>'
                        },
                        targets: 1
                    },
                    {
                        render: (data, type, row) => {

                            return  row.houses.length
                        },
                        targets: 2
                    },
                    {
                        render: (data, type, row) => {
                            return  row.address.state
                        },
                        targets: 3
                    },
                    {
                        render: (data, type, row) => {
                            return  row.address.city
                        },
                        targets: 4
                    },
                    {
                        render: (data, type, row) => {
                            return  row.address.street
                        },
                        targets: 5
                    },

                    {
                        render: (data, type, row) => {
                            return  row.address.zip_code
                        },
                        targets: 6
                    },
                ]
            });
        })

    },
    data(){
        const  {get_users , errors} = use_users()
        return {
            get_users,
            errors,
        }
    }
}
</script>
