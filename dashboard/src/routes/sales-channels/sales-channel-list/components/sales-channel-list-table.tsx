import { PencilSquare, Trash } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import {
  Button,
  Container,
  Heading,
  Text,
  toast,
  usePrompt,
} from "@medusajs/ui"
import { keepPreviousData } from "@tanstack/react-query"
import { createColumnHelper } from "@tanstack/react-table"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import {
  ActionGroup,
  ActionMenu,
} from "../../../../components/common/action-menu"
import { _DataTable } from "../../../../components/table/data-table"
import { useStore } from "../../../../hooks/api"
import {
  useDeleteSalesChannel,
  useSalesChannels,
} from "../../../../hooks/api/sales-channels"
import { useSalesChannelTableColumns } from "../../../../hooks/table/columns/use-sales-channel-table-columns"
import { useSalesChannelTableFilters } from "../../../../hooks/table/filters"
import { useSalesChannelTableQuery } from "../../../../hooks/table/query/use-sales-channel-table-query"
import { useDataTable } from "../../../../hooks/use-data-table"

const PAGE_SIZE = 20

export const SalesChannelListTable = () => {
  const { t } = useTranslation()

  const { store } = useStore()

  const { raw, searchParams } = useSalesChannelTableQuery({
    pageSize: PAGE_SIZE,
  })

  const {
    sales_channels,
    count,
    isPending: isLoading,
    isError,
    error,
  } = useSalesChannels(searchParams, {
    placeholderData: keepPreviousData,
  }) as Omit<ReturnType<typeof useSalesChannels>, "sales_channels"> & {
    sales_channels: (HttpTypes.AdminSalesChannel & { is_default?: boolean })[]
  }

  const columns = useColumns()
  const filters = useSalesChannelTableFilters()

  const sales_channels_data =
    sales_channels?.map((sales_channel) => {
      sales_channel.is_default =
        store?.default_sales_channel_id === sales_channel.id
      return sales_channel
    }) ?? []

  const { table } = useDataTable({
    data: sales_channels_data,
    columns,
    count,
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE,
  })

  if (isError) {
    throw error
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading>{t("salesChannels.domain")}</Heading>
          <Text className="text-ui-fg-subtle" size="small">
            {t("salesChannels.subtitle")}
          </Text>
        </div>
        <Link to="/settings/sales-channels/create">
          <Button size="small" variant="secondary">
            {t("actions.create")}
          </Button>
        </Link>
      </div>
      <_DataTable
        table={table}
        columns={columns}
        count={count}
        pageSize={PAGE_SIZE}
        filters={filters}
        pagination
        search
        navigateTo={(row) => row.id}
        isLoading={isLoading}
        queryObject={raw}
        orderBy={[
          { key: "name", label: t("fields.name") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") },
        ]}
      />
    </Container>
  )
}

const SalesChannelActions = ({
  salesChannel,
}: {
  salesChannel: HttpTypes.AdminSalesChannel & { is_default?: boolean }
}) => {
  const { t } = useTranslation()
  const prompt = usePrompt()
  const { mutateAsync } = useDeleteSalesChannel(salesChannel.id)

  const handleDelete = async () => {
    const confirm = await prompt({
      title: t("general.areYouSure"),
      description: t("salesChannels.deleteSalesChannelWarning", {
        name: salesChannel.name,
      }),
      verificationInstruction: t("general.typeToConfirm"),
      verificationText: salesChannel.name,
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel"),
    })

    if (!confirm) {
      return
    }

    await mutateAsync(undefined, {
      onSuccess: () => {
        toast.success(t("salesChannels.toast.delete"))
      },
      onError: (e) => {
        toast.error(e.message)
      },
    })
  }

  const disabledTooltip = salesChannel.is_default
    ? t("salesChannels.tooltip.cannotDeleteDefault")
    : undefined

  const groups: ActionGroup[] = [
    {
      actions: [
        {
          icon: <PencilSquare />,
          label: t("actions.edit"),
          to: `/settings/sales-channels/${salesChannel.id}/edit`,
        },
        {
          icon: <Trash />,
          label: t("actions.delete"),
          onClick: handleDelete,
          disabled: salesChannel.is_default,
          disabledTooltip,
        },
      ],
    },
  ]

  return <ActionMenu groups={groups} />
}

const columnHelper = createColumnHelper<HttpTypes.AdminSalesChannel>()

const useColumns = () => {
  const base = useSalesChannelTableColumns()

  return useMemo(
    () => [
      ...base,
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
          return <SalesChannelActions salesChannel={row.original} />
        },
      }),
    ],
    [base]
  )
}
