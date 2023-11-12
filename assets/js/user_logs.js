function toTable(json) {
    if(json.length === 0) return;
    let thead = `
        <thead>
            <tr>
                <th>Title</th>
                <!-- <th>Actions</th> -->
                <th>Performer</th>
            </tr>
        </thead>
    `;
    let tbody = '<tbody>';
    for(const row of json) {
        tbody += '<tr>';
        tbody += `<td>${row.title}</td>`;
        // tbody += `<td>${row.details}</td>`;
        tbody += `<td>Performed by <b>${row.created_by}</b> on <b>${row.created_date}</b></td>`;
        tbody += '</tr>';
    }
    tbody += '</tbody>';
    return thead += tbody;
}

$(window).on("load", async (e)=>{
    const form = new FormData();
    form.append("uid", CONST_UID);
    const resp = await fetch(`${base_url}user/logs`, { method : 'post', body : form });
    const result = await resp.json();
    const table = toTable(result);
    const dataTable = $("#dataTable");
    dataTable.removeClass('loading');
    dataTable.html(table);
    dataTable.DataTable();
});